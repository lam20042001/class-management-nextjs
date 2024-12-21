import {GetStaticPaths, GetStaticProps} from 'next';
import axios from 'axios';
import {Student} from "@/types/Student";


interface StudentDetailProps {
    student: Student;
}

const StudentDetail = ({student}: StudentDetailProps) => {
    return (
        <div>
            <h1>Student Detail</h1>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Class:</strong> {student.class.name}</p>
        </div>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const {data} = await axios.get('http://localhost:3000/class', {
        headers: {
            Authorization: 'Bearer admin',
        },
    });

    const paths = data.map((classData: Student) => ({
        params: {id: classData.id.toString()},
    }));

    return {paths, fallback: 'blocking'};
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