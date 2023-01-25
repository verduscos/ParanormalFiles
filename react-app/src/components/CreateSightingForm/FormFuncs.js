import { AiOutlineLoading3Quarters } from 'react-icons/ai';


export const loadingIcon = (loading) => (
  loading ?
    <div id="loading-container">
      < AiOutlineLoading3Quarters />
    </div >
    : null
)

// rezie
export const autosize = (e) => {
  e.target.style.height = 'inherit';
  e.target.style.height = `${e.target.scrollHeight}px`;
}

export const removeImg = (e, setImgFile, setImgUrl, setDisplayImgBtn) => {
  e.preventDefault();
  setImgFile("");
  setImgUrl("");
  setDisplayImgBtn(true);
}

export const updateImage = (e, setImgFile, setDisplayImgBtn) => {
  const file = e.target.files[0];
  if (file !== undefined) {
    setImgFile(file);
    setDisplayImgBtn(false);
  }
}

export const validateContent = (e, title, description, setErrors, setDisplayTagModal) => {
  e.preventDefault();
  const currentErrors = [];
  if (title.length < 5 || title.length > 100) currentErrors.push("Title must be between 5-100 characters.");
  if (description.length < 5 || description.length > 3000) currentErrors.push("Description must be between 5-3000 characters.");
  setErrors(currentErrors);
  if (!currentErrors.length) setDisplayTagModal(true);
}

// disable video and image pasting for quill
export const formats = [
  'background',
  'bold',
  'color',
  'font',
  'code',
  'italic',
  'link',
  'size',
  'strike',
  'script',
  'underline',
  'blockquote',
  'header',
  'indent',
  'list',
  'align',
  'direction',
  'code-block',
  'formula'
  // 'image'
  // 'video'
]
