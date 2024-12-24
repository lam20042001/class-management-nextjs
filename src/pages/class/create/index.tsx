import {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Modal from '@/components/Modal';

const AddClassForm = () => {
    const [name, setName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setError('');
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/class/create', {name}, {
                headers: {
                    Authorization: 'Bearer admin',
                },
            });
            router.push('/class');
        } catch (error: any) {
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
                    <input
                        className='w-96 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={error}>
            </Modal>
        </div>
    );
};

export default AddClassForm;