import {Link, useNavigate, useNavigation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {collection, getDocs, addDoc} from "@firebase/firestore";
import firebaseApp from "../firebase";

export const AddProjectForm = () => {
    const history = useNavigate();
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    useEffect(() => {
        fetchTeamMembers().then(r => {
        });
    }, []);
    const fetchTeamMembers = async () => {
        await getDocs(collection(firebaseApp.firestore, "team_members"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setTeamMembers(newData);
            });
    }
    const getData = (form: any) => {
        const formData = new FormData(form);
        const data: any = {};
        formData.forEach((value, key) => {
            data[key] = value;
        })
        return data;
    }


    return <>
        <div className={'flex my-2 gap-2 justify-between'}>
            <h2 className={'text-3xl'}>Projects</h2>
            <Link to={'/add-project'}>
                <button className={'btn'}>Cancel</button>
            </Link>
        </div>
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const docRef = await addDoc(collection(firebaseApp.firestore, "projects"), getData(event.target));
                console.log("Document written with ID: ", docRef.id);
                history('/projects');
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }}>
            <div className="mb-6">
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Project name</label>
                <input type="text" id="text" name={'name'}
                       placeholder="excellent idea" required/>
            </div>
            <div className="mb-6">
                <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900">Project name</label>
                <input type="date" id="due_date" name={'due_date'}
                       placeholder="excellent idea" required/>
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Project lead</label>
                <select required name={'project_owner'}>
                    {
                        teamMembers.map((value) => {
                            return <option value={value.id} key={value.id}>{value.name}</option>
                        })
                    }
                </select>
            </div>
            <button className={'btn'} type={'submit'}>Add Project</button>
        </form>
    </>
}
