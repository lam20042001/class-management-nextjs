import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddStudentForm = () => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('afdfsafsdfadsfads')
        try {
            await axios.post('http://localhost:3000/student/create', { name, className }, {
                headers: {
                    Authorization: 'Bearer admin',
                },
            });
            router.push('/list');
        } catch (error) {
            console.error('Failed to add student:', error);
        }
    };

    return (
        <div>
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
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
                    <input
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
        </div>
    );
};

export default AddStudentForm;