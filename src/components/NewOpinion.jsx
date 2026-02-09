import { useActionState } from 'react';

export function NewOpinion() {
  const handleFormAction = (prevState, formData) => {
    const form = {
      userName: formData.get('userName'),
      title: formData.get('title'),
      body: formData.get('body'),
    };

    return { errors: null };
  };

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
            <input type="text" id="userName" name="userName" />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5}></textarea>
        </p>

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
