import Link from "next/link";

const AddStudentButton = () => {
    return (
        <Link href="/student/create" >
            <button className='border border-gray-500 px-4 py-2 rounded'>Add Student</button>
        </Link>
    );
}
export default AddStudentButton;