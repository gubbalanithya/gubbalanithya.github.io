function valueBoolean(string) {
    return string === 'Yes';
}

function valueYear(string) {
    return Number(string.substr(0, 1));
}

class Student {

    constructor(student) {
        this.id = student.id;
        this.gpa_1 = Number(student['GPA 1st Year']);
        this.gpa_2 = Number(student['GPA 2nd Year']);
        this.gpa_3 = Number(student['GPA 3rd Year']);
        this.gpa_4 = Number(student['GPA 4th Year']);
        this.gpa_5 = student['GPA - 5th Year'] ? Number(student['GPA - 5th Year']) : null;
        this.job_3 = valueBoolean(student['Job Placement - 3rd Year']);
        this.job_4 = valueBoolean(student['Job Placement - 4th Year']);
        this.job_5 = valueBoolean(student['Job Placement - 5th Year']);
        this.year_of_graduation = valueYear(student['Year of Graduation']);
        this.age_start = Number(student['age in 1st year']);
        this.age_graduation = Number(student['age at graduation']);
        this.gender = student.gender;
        this.ethnicity = student.ethnicity;
    }

    passesYear1() {
        return this.gpa_1 >= 3;
    }

    passesYear2() {
        return this.passesYear1() && this.gpa_2 >= 3;
    }

    passesYear3() {
        return this.passesYear2() && this.gpa_3 >= 3;
    }

    passesYear4() {
        return this.passesYear3() && this.gpa_4 >= 3;
    }

    didYear5() {
        return this.gpa_5;
    }

    passesYear5() {
        return this.didYear5() && this.gpa_5 >= 3;
    }

    averageGPA() {
        let total = this.gpa_1 + this.gpa_2 + this.gpa_3 + this.gpa_4;
        if (this.gpa_5) {
            total += this.gpa_5;
            return total / 5;
        } else {
            return total / 4;
        }
    }

    //

    matchesJobSecuring(type) {
        switch (type) {
            case '3rd year':
                return this.job_3;
            case '4th year':
                return this.job_4;
            case '5th year':
                return this.job_5;
            case 'No job':
                return !this.job_3 && !this.job_4 && !this.job_5;
        }
    }
}

export default Student;



