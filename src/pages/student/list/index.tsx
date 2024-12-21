import {useState} from 'react';
import {GetServerSideProps} from 'next';
import axios from "axios";
import {Student} from "@/types/Student";


interface ListProps {
    data: Student[];
}

const List = ({data}: ListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(data);

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
            <h1>Student List</h1>
            <input
                type="text"
                placeholder="Search by student name or class name"
                value={searchTerm}
                onChange={handleSearch}
            />
            <table>
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Class Name</th>
                </tr>
                </thead>
                <tbody>
                {filteredStudents.map((student) => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.class.name}</td>
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