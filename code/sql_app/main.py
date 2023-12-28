# start with 'uvicorn sql_app.main:app --reload in cmd in the parent directory
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
import bcrypt

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/users/{user_id}/items/", response_model=list[schemas.Item])
def read_items_of_user(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_items_of_user(db, user_id=user_id, skip=skip, limit=limit);

@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)

@app.patch("/users/{user_id}/items/{item_id}", response_model=schemas.Item)
def update_item(user_id: int, item_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.update_item(db, item=item, user_id=user_id, item_id=item_id);

@app.delete("/users/{user_id}/items/{item_id}")
def delete_item_from_user(user_id: int, item_id: int, db: Session = Depends(get_db)):
    return crud.delete_item(db, item_id=item_id);

@app.get("/items/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

class UserLogin(BaseModel):
    username: str
    password: str

@app.post("/login/")
async def login(user_login: UserLogin, db: Session = Depends(get_db)):
    username = user_login.username;
    pwd = user_login.password;

    db_user = crud.get_user_by_username(db, username=username);
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    if(crud.pwdCheck(hashedPassword=db_user.hashed_password, pwd=pwd, salt=db_user.salt) == False):
        raise HTTPException(status_code=400, detail="Wrong password")

    return { "message": "Login successful", "user": db_user};