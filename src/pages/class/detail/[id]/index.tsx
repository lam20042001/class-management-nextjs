import {GetStaticPaths, GetStaticProps} from 'next';
import axios from 'axios';
import Class from "@/types/Class";


interface ClassDetailProps {
    classData: Class;
}

const ClassDetail = ({classData}: ClassDetailProps) => {
    return (
        <div className="p-6 bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Class Detail</h1>
            <p className="mb-2"><strong>ID:</strong> {classData.id}</p>
            <p className="mb-2"><strong>Name:</strong> {classData.name}</p>
        </div>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const {data} = await axios.get('http://localhost:3000/class', {
        headers: {
            Authorization: 'Bearer admin',
        },
    });

    const paths = data.map((classData: Class) => ({
        params: {id: classData.id.toString()},
    }));

    return {paths, fallback: 'blocking'};
};

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params!;
    const {data} = await axios.post(`http://localhost:3000/class/id`, {id: id},
            {
                headers: {
                    Authorization: 'Bearer admin',
                }
                ,
            }
        )
    ;

    return {
        props: {
            classData: data,
        },
        revalidate: 10,
    };
};

export default ClassDetail;