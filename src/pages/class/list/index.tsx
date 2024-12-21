import {useState} from 'react';
import {GetServerSideProps} from 'next';
import axios from "axios";
import {Class} from "@/types/Student";


interface ListProps {
    data: Class[];
}

const List = ({data}: ListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClasses, setFilteredClasses] = useState(data);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredClasses(
            data.filter(
                (student) =>
                    student.name.toLowerCase().includes(value)
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
                {filteredClasses.map((student) => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
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