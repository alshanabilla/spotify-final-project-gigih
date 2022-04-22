import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import './index.css';

function CreatePlaylist ({ userId, uriTracks }) {
    const accessToken = useSelector((state) => state.auth.accessToken);
    
    const [form, setForm] = useState({
        title: '',
        description: '',
    });

    const [errorForm, setErrorForm] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value });
        setErrorForm({ ...errorForm, [name]: '' });
    }

    const validateForm = () => {
        let isValid = true;

        if (form.title.length < 10) {
        setErrorForm({
            ...errorForm,
            title: 'Title must be at least 10 characters long'
        });
        isValid = false;
        }

        if (form.description.length > 100) {
        setErrorForm({
            ...errorForm,
            description: 'Description must be at least 10 characters long'
        });
        isValid = false;
        }

        return isValid;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
        if (uriTracks.length > 0) {
            try {
            const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
                name: form.title,
                description: form.description,
            });

            await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

            alert("Playlist created successfully");

            setForm({ title: '', description: '' });
            } catch (error) {
            alert(error);
            }
        } else {
            alert("Please select at least one track")
        }
        }
    }

    return (
        <div className="create-playlist-form">
            <div>
                <h1>Create Playlist</h1>
                <form onSubmit={handleSubmit} className="form form-playlist">
                    <TextField
                        type="text"
                        label="Title"
                        placeholder="Title of playlist"
                        id="title"
                        name="title" 
                        variant="outlined"
                        // value={form.title} 
                        defaultValue={form.title}
                        onChange={handleChange}
                        required
                    />
                    <TextareaAutosize  
                        minRows={5}  
                        label="Description"
                        placeholder="Description of playlist"
                        // value={form.description}
                        defaultValue={form.description}
                        id="description"
                        name="description"
                        onChange={handleChange}
                        required
                    />
                    <div className="form-playlist__action">
                        <Button 
                            className="form-playlist_button"
                            variant="contained" 
                            type="submit"
                            color="primary"
                            disableElevation 
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePlaylist;