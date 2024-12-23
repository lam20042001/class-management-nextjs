import {GetStaticPaths, GetStaticProps} from 'next';
import axios from 'axios';
import Student from "@/types/Student";



interface StudentDetailProps {
    student: Student;
}

const StudentDetail = ({student}: StudentDetailProps) => {
    return (
        <div className="p-6 bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Student Detail</h1>
            <p className="mb-2"><strong>ID:</strong> {student.id}</p>
            <p className="mb-2"><strong>Name:</strong> {student.name}</p>
            <p className="mb-2"><strong>Class:</strong> {student.class.name}</p>
        </div>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await axios.get('http://localhost:3000/student', {
        headers: {
            Authorization: 'Bearer admin',
        },
    });

    const paths = data.map((student: Student) => ({
        params: { id: student.id.toString() },
    }));

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params!;
    const {data} = await axios.post(`http://localhost:3000/student/id`, {id: id},
            {
                headers: {
                    Authorization: 'Bearer admin',
                }
                ,
            }
        )
    ;

    return {
        props: {
            student: data,
        },
        revalidate: 10,
    };
};

export default StudentDetail;