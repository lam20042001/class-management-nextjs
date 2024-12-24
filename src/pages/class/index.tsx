import {useState} from 'react';
import {GetServerSideProps} from 'next';
import axios from "axios";
import Class from "@/types/Class";
import AddClassButton from '@/components/AddClassButton';
import Link from 'next/link';
import Modal from '@/components/Modal';

interface ListProps {
    data: Class[];
}

const List = ({data}: ListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClasses, setFilteredClasses] = useState(data);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete = async (id: number) => {
        try {
            await axios.request({
                url: 'http://localhost:3000/class/delete',
                method: 'DELETE',
                data: {id: id},
                headers: {
                    Authorization: 'Bearer admin',
                },
            });
            setFilteredClasses(filteredClasses.filter((classData) => classData.id !== id));
        } catch (error: any) {
            setIsModalOpen(true);
            setError(error.response.data.devMessage);
            console.error('Failed to delete class:', error);
        }
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setError('');
    };
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredClasses(
            data.filter(
                (classData) =>
                    classData.name.toLowerCase().includes(value)
            )
        );
    };

    return (
        <div>
            <AddClassButton/>
            <br></br>
            <input
                type="text"
                placeholder="Search by class name"
                value={searchTerm}
                onChange={handleSearch}
            />
            <table className='table-auto border-collapse border-4 border-black'>
                <thead>
                <tr>
                    <th className='border-black border-4'>Class Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {filteredClasses.map((classData) => (
                    <tr key={classData.id}>
                        <td className='border-black border-4'>{classData.name}</td>
                        <td className='border-black border-4'><Link href={`/class/detail/${classData.id}`}>
                            <button>Detail</button>
                        </Link></td>
                        <td className='border-black border-4'>
                            <button onClick={() => handleDelete(classData.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={error}/>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const {data} = await axios.get('http://localhost:3000/class', {
        headers: {
            Authorization: 'Bearer admin',
        },
    });
    console.log(data)
    return {
        props: {
            data,
        },
    };
};

export default List;