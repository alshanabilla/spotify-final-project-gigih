import React, { useState } from "react";
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';

function CreatePlaylist ({ accessToken, userId, uriTracks }) {
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
          alert(e);
        }
      } else {
        alert("Please select at least one track")
      }
    }
  }

    return (
        <div>
            <h1>Create Playlist</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title : </label>
                <input 
                    type="text" 
                    id="title"
                    name="title" 
                    value={form.title} 
                    onChange={handleChange}
                    error={errorForm.title} 
                    required
                /><br />
                <label htmlFor="description">Description : </label>
                <textarea
                    value={form.description}
                    id="description"
                    name="description"
                    onChange={handleChange}
                    error={errorForm.description}
                    required
                />
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreatePlaylist;