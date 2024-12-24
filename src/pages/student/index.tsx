import {useState} from 'react';
import {GetServerSideProps} from 'next';
import axios from "axios";
import Student from "@/types/Student";
import AddStudentButton from '@/components/AddStudentButton';
import Link from 'next/link';

interface ListProps {
    data: Student[];
}

const List = ({data}: ListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(data);
    const handleDelete = async (id: number) => {
        try {
            await axios.request({
                url: 'http://localhost:3000/student/delete',
                method: 'DELETE',
                data: {id: id},
                headers: {
                    Authorization: 'Bearer admin',
                },
            });
            setFilteredStudents(filteredStudents.filter((student) => student.id !== id));
        } catch (error) {
            console.error('Failed to delete student:', error);
        }
    }
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredStudents(
            data.filter(
                (student) =>
                    student.name.toLowerCase().includes(value) || student.class.name?.toLowerCase().includes(value)
            )
        );
    };

    return (
        <div>
            <AddStudentButton/>
            <br></br>
            <input
                type="text"
                placeholder="Search by student name or class name"
                value={searchTerm}
                onChange={handleSearch}
                className={'my-4'}
            />
            <table className='table-auto border-collapse border-4 border-black'>
                <thead>
                <tr>
                    <th className='border-black border-4'>Student Name</th>
                    <th className='border-black border-4'>Class Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {filteredStudents.map((student) => (
                    <tr key={student.id}>
                        <td className='border-black border-4'>{student.name}</td>
                        <td className='border-black border-4'>{student.class.name}</td>
                        <td className='border-black border-4'><Link href={`/student/detail/${student.id}`}>
                            <button>Detail</button>
                        </Link></td>
                        <td className='border-black border-4'>
                            <button onClick={() => handleDelete(student.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const {data} = await axios.get('http://localhost:3000/student', {
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