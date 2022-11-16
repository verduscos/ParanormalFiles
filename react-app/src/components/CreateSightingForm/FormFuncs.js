import { AiOutlineLoading3Quarters, AiOutlineClose } from 'react-icons/ai';


export const loadingIcon = (loading) => (
  loading ?
    <div id="loading-container">
      < AiOutlineLoading3Quarters />
    </div >
    : null
)

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
