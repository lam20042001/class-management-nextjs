import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { useState } from 'react';
import Class from "@/types/Class";
import Modal from "@/components/Modal";

interface ClassDetailProps {
    classData: Class;
}

const ClassDetail = ({ classData }: ClassDetailProps) => {
    const [name, setName] = useState(classData.name);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/class/update`, {
                id: classData.id,
                name,
            }, {
                headers: {
                    Authorization: 'Bearer admin',
                },
            });
        } catch (error: any) {
            setIsModalOpen(true);
            setError(error.response.data.devMessage);
            setName(classData.name);
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Class Detail</h1>
            <p className="mb-2"><strong>ID:</strong> {classData.id}</p>
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
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Update
                </button>
            </form>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={error}></Modal>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await axios.get('http://localhost:3000/class', {
        headers: {
            Authorization: 'Bearer admin',
        },
    });

    const paths = data.map((classData: Class) => ({
        params: { id: classData.id.toString() },
    }));

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params!;
    const { data } = await axios.post(`http://localhost:3000/class/id`, { id: id }, {
        headers: {
            Authorization: 'Bearer admin',
        },
    });

    return {
        props: {
            classData: data,
        },
        revalidate: 10,
    };
};

export default ClassDetail;