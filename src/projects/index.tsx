import React, {useEffect, useState} from "react";
import firebaseApp from "../firebase";
import {getDocs, collection, deleteDoc, doc} from "@firebase/firestore";
import {Link} from "react-router-dom";

const ProjectList = () => {
    const [projects, setProjects] = useState<any[]>([]);
    useEffect(() => {
        fetchProjects();
    }, []);
    const fetchProjects = async () => {
        await getDocs(collection(firebaseApp.firestore, "projects"))
            .then((querySnapshot)=>{
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setProjects(newData);
            });
    }

    return <>
        <div className="relative overflow-x-auto sm:rounded-lg">
            <div className={'flex my-2 gap-2 justify-between'}>
                <h2 className={'text-3xl'}>Projects</h2>
                <Link to={'/add-project'}>
                    <button className={'btn'}>Add New Project</button>
                </Link>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Project name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Project owner
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Due Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    projects.map(value => {
                        return <tr key={value.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {value.name}
                            </th>
                            <td className="px-6 py-4">
                                {value.project_owner}
                            </td>
                            <td className="px-6 py-4">
                                {value.due_date}
                            </td>
                            <td className="px-6 py-4 gap-2 flex">
                                <Link to={'/edit-project/' + value.id}
                                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                <a href="#" onClick={() => {
                                    if (confirm('Do you really want to delete project?')) {
                                        const d = doc(collection(firebaseApp.firestore, "projects"), value.id);
                                        deleteDoc(d).then(r => fetchProjects());
                                    }
                                }}
                                   className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    </>;
}

export default ProjectList;
