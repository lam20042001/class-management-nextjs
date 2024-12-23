import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal';
const AddStudentForm = () => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setError('');
    };
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/student/create', { name, className }, {
                headers: {
                    Authorization: 'Bearer admin',
                },
            });
            router.push('/student');
        } catch (error:any) {
            setIsModalOpen(true);
            setError(error.response.data.devMessage);
            console.error('Failed to add student:', error.response.data.devMessage);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input className='w-96 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Class Name:
                    <input className='w-96 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="text"
                        name="className"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={error}></Modal>
        </div>
    );
};

export default AddStudentForm;