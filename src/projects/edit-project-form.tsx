import {Link, useNavigate, useNavigation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {collection, getDoc,getDocs, updateDoc, doc, DocumentData, DocumentReference, DocumentSnapshot} from "@firebase/firestore";
import firebaseApp from "../firebase";

export const EditProjectForm = () => {
    const history = useNavigate();
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [project, setProject] = useState<any>({});
    const params = useParams();
    const [ref, setRef] = useState<DocumentReference>();
    useEffect(() => {
        if (params.id) {
            getDoc(doc(collection(firebaseApp.firestore, "projects"), params.id)).then(value => {
                setRef(value.ref);
                setProject(value.data());
            })
        }
    }, [params]);

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
        <form id={'editProjectForm'} onSubmit={async (event) => {
            event.preventDefault();
            try {
                if (ref) {
                    await updateDoc(ref, getData(event.target));
                    history('/projects');
                }
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }}>
            <div className="mb-6">
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Project name</label>
                <input type="text" id="name" name={'name'} value={project.name} onChange={event => {
                    setProject({
                        ...project,
                        name: event.target.value
                    })
                }}
                       placeholder="excellent idea" required/>
            </div>
            <div className="mb-6">
                <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900">Project name</label>
                <input type="date" id="due_date" name={'due_date'} value={project.due_date} onChange={event => {
                    setProject({
                        ...project,
                        due_date: event.target.value
                    })
                }}
                       placeholder="excellent idea" required/>
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Project lead</label>
                <select required name={'project_owner'} value={project.project_owner}  onChange={event => {
                    setProject({
                        ...project,
                        project_owner: event.target.value
                    })
                }}>
                    {
                        teamMembers.map((value) => {
                            return <option value={value.id} key={value.id}>{value.name}</option>
                        })
                    }
                </select>
            </div>
            <button className={'btn'} type={'submit'}>Edit Project</button>
        </form>
    </>
}
