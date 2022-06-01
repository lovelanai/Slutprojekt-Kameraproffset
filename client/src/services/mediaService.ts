const createMedia = async (formData: FormData): Promise<any> =>
  fetch('/api/media', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  }).then((response) => response.json());

const replaceMedia = async (id: string, formData: FormData): Promise<any> =>
  fetch(`/api/media/${id}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  }).then((response) => response.json());

const deleteMedia = async (id: string): Promise<Response> =>
  fetch(`/api/media/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

export { createMedia, replaceMedia, deleteMedia };
