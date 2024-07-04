from passlib.context import CryptContext

from pydantic import GetCoreSchemaHandler, GetJsonSchemaHandler,ValidationInfo
import re
from typing import Any

from pydantic_core import core_schema
from pydantic.json_schema import JsonSchemaValue

# telling to passlib which is the hashing algorithm
pwd_content = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash(password: str):
    return pwd_content.hash(password)

def verify(plain_password, hashed_password):
    return pwd_content.verify(plain_password, hashed_password)


class CPFValidationError(ValueError):
    def __init__(self, message: str = "Invalid CPF format"):
        self.message = message
        super().__init__(self.message)

class CPF(str):
    @classmethod
    def __get_pydantic_core_schema__(cls, source: Any, handler: GetCoreSchemaHandler) -> core_schema.CoreSchema:
        return core_schema.with_info_plain_validator_function(cls.validate)

    @classmethod
    def validate(cls, value: str, info: ValidationInfo) -> str:
        if not isinstance(value, str):
            raise TypeError('string required')
        if not re.match(r'^\d{3}\.\d{3}\.\d{3}\-\d{2}$', value):
            raise CPFValidationError("Invalid CPF format. Expected xxx.xxx.xxx-xx")
        # Remove Validation Formatting
        unformatted_cpf = re.sub(r'\D', '', value)
        # Check if it is a sequence of repeated numbers
        if unformatted_cpf == unformatted_cpf[0] * len(unformatted_cpf):
            raise CPFValidationError("Invalid CPF: sequence of repeated numbers")
        # Implement CPF validation
        if not cls.validate_cpf(unformatted_cpf):
            raise CPFValidationError("Invalid CPF number")
        
        return value

    @staticmethod
    def validate_cpf(cpf: str) -> bool:
        # Validated if the CPF number is valid using the verifying digits
        if len(cpf) != 11:
            return False
        
        def calculate_digit(digits: str) -> int:
            # Calculates one of the CPF verifying digits
            sum = 0
            weight = len(digits) + 1
            for digit in digits:
                sum += int(digit) * weight
                weight -= 1
            remainder = sum % 11
            return 0 if remainder < 2 else 11 - remainder
        
        first_digit = calculate_digit(cpf[:9])
        second_digit = calculate_digit(cpf[:9] + str(first_digit))
        return cpf == cpf[:9] + str(first_digit) + str(second_digit)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema: core_schema.CoreSchema, handler: GetJsonSchemaHandler) -> JsonSchemaValue:
        return {}
