from .database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    course = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    type = Column(String, nullable=False, default="student")

class Associate(Base):
    __tablename__ = "associates"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    type = Column(String, nullable=False, default="associate")

class Area(Base):
    __tablename__ = "areas"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)

class Schedule(Base):
    __tablename__ = "schedules"
    id = Column(Integer, primary_key=True, nullable=False)
    area_id = Column(Integer, ForeignKey="areas.id", ondelete="CASCADE", nullable=False)
    user_id = Column(Integer, nullable=False)
    user_type = Column(String, nullable=False)
    start_time = Column(TIMESTAMP(timezone=True), nullable=False)
    end_time = Column(TIMESTAMP(timezone=True), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

    area = relationship("Area")

    @property
    def user(self):
        if self.user_type == 'student':
            return self.session.query(Student).filter_by(id=self.user_id).one_or_none()
        elif self.user_type == 'associate':
            return self.session.query(Associate).filter_by(id=self.user_id).one_or_none()
        return None