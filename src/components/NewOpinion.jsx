import { useActionState, use } from 'react';
import { OpinionsContext } from '../store/opinions-context';
import Submit from './Submit';

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function handleFormAction(prevState, formData) {
    const form = {
      userName: formData.get('userName'),
      title: formData.get('title'),
      body: formData.get('body'),
    };

    const errors = [];

    if (
      !form.userName ||
      form.userName.trim().length === 0 ||
      form.userName.trim().length < 4
    ) {
      errors.push(
        'User name is required and must be at least 4 characters long.',
      );
    }

    if (
      !form.title ||
      form.title.trim().length === 0 ||
      form.title.trim().length < 5
    ) {
      errors.push('Title is required and must be at least 5 characters long.');
    }

    if (!form.body || form.body.trim().length === 0) {
      errors.push('Opinion body is required.');
    }

    if (errors.length > 0) {
      return { errors, data: form };
    }

    await addOpinion({ ...form });

    return { errors: null };
  }

  const [formState, formAction] = useActionState(handleFormAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.data?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.data?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.data?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <div className="errors">
            <p>Please fix the following errors:</p>
            <ul>
              {formState.errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <Submit />
      </form>
    </div>
  );
}
