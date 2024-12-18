import Subject from "@model/subject";

type Enrollment = {
	studentId: string;
	subjects: Subject[];
	totalCredits: number;
};

export default Enrollment;