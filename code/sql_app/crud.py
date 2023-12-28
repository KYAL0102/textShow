from fastapi import HTTPException
from sqlalchemy.orm import Session
import bcrypt

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    salt = bcrypt.gensalt();
    pwdBytes = bytes(user.password, 'utf-8');
    hashed_password = bcrypt.hashpw(pwdBytes, salt)
    db_user = models.User(username=user.username, hashed_password=hashed_password, salt=salt)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_items_of_user(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Item).filter(models.Item.owner_id == user_id).offset(skip).limit(limit).all();

def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()

def update_item(db: Session, item: schemas.ItemCreate, user_id: int, item_id: int):
    db_item = db.get(models.Item, item_id);
    if not db_item:
        raise HTTPException(status_code=404, detail="item not found")
    db_item.title = item.title;
    db_item.text = item.text;
    db_item.compressedList = item.compressedList;
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item;

def delete_item(db: Session, item_id: int):
    db_item = db.get(models.Item, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return { "ok": True }


def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def pwdCheck(hashedPassword: bytes, pwd: str, salt: bytes) -> bool:
    hash = bcrypt.hashpw(bytes(pwd, 'utf-8'), salt);
    return hashedPassword == hash;