from .database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "students"
    id = Column(String, primary_key=True, nullable=False, unique=True) # id is the CPF (Cadastro de Pessoa Física)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    course = Column(String, nullable=True)
    email = Column(String, nullable=False, unique=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    type = Column(String, nullable=False, default="student")

class Area(Base):
    __tablename__ = "areas"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)

class Schedule(Base):
    __tablename__ = "schedules"
    id = Column(Integer, primary_key=True, nullable=False)
    area_id = Column(Integer, ForeignKey="areas.id", ondelete="CASCADE", nullable=False)
    user_id = Column(String, nullable=False)
    user_type = Column(String, nullable=False)
    start_time = Column(TIMESTAMP(timezone=True), nullable=False)
    end_time = Column(TIMESTAMP(timezone=True), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

    area = relationship("Area")