from pydantic import BaseModel

class StudentData(BaseModel):
    gender: str
    race_ethnicity: str
    parental_level_of_education: str
    lunch: str
    test_preparation_course: str
    math_score: int
    reading_score: int
    writing_score: int

class VisualizationRequest(BaseModel):
    x_axis: str
    y_axis: str
    chart_type: str  # "bar", "line", "scatter", "histogram"
