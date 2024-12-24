import {GetStaticPaths, GetStaticProps} from 'next';
import axios from 'axios';
import {useState} from 'react';
import Student from '@/types/Student';
import Modal from "@/components/Modal";

interface StudentDetailProps {
    student: Student;
}

const StudentDetail = ({student}: StudentDetailProps) => {
    const [name, setName] = useState(student.name);
    const [className, setClassName] = useState(student.class.name);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setError('');
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/student/update`, {
                id: student.id,
                name,
                className,
            }, {
                headers: {
                    Authorization: 'Bearer admin',
                },
            });
        } catch (error: any) {
            setIsModalOpen(true);
            setError(error.response.data.devMessage);
            setName(student.name);
            setClassName(student.class.name);
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Student Detail</h1>
            <p><strong>ID:</strong> {student.id}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Class Name:</label>
                    <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Update
                </button>
            </form>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={error}></Modal>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const {data} = await axios.get('http://localhost:3000/student', {
        headers: {
            Authorization: 'Bearer admin',
        },
    });

    const paths = data.map((student: Student) => ({
        params: {id: student.id.toString()},
    }));

    return {paths, fallback: 'blocking'};
};

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params!;
    const {data} = await axios.post(`http://localhost:3000/student/id`, {id: id}, {
        headers: {
            Authorization: 'Bearer admin',
        },
    });

    return {
        props: {
            student: data,
        },
        revalidate: 10,
    };
};

export default StudentDetail;