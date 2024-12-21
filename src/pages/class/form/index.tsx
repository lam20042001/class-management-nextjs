import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddClassForm = () => {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/class/create', { name }, {
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddClassForm;