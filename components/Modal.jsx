'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import DropdownMenu_Tailwind from '@components/DropDown_Tailwind';


export default function Example(props) {
  // Used to open and close the modal
  const [open, setOpen] = useState(false)

  // Data to Be Transmitted
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [dept, setDept] = useState("");
  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [banner, setBanner] = useState("");

  // Functions to update the data to be Transmitted
  const handleType = (value) => setType(value)
  const handleDept = (value) => setDept(value)
  const handleTitle = (e) => setTitle(e.target.value)
  const handleDesc = (e) => setDesc(e.target.value)
  const handleFile = (e) => setFile(e.target.files?.[0])
  const handleImg = (e) => setImg(e.target.files?.[0])
  

  // Function to Send Data to Backend
  const onSubmit = async (e) => {
    e.preventDefault()

    // Error -> Type or Dept Not Set 
    if (!type || !dept) {
      console.log("Department or Type Not Specified")
      return;
    }

    // Creating FormData Object to be sent to Backend
    const data = new FormData(e.target);
    data.set('type', type);
    data.set('dept', dept);
    if (file) data.set('file', file); 
    if (img) data.set('img', img); 
    if (banner) data.set('banner', banner);
    
    // Logging all items in the FormData object
    for (const [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    // Submitting Data to Backend
    const res = await fetch('/api/news', {
      method: "POST",
      body: data
    })

    // Resetting values to default
    handleType("")
    handleDept("")
    setFile(null)
    setImg(null)
    setBanner(null)

    if (!res.ok) throw new Error(await res.text());
    props.callback()
    return;
  }

  return (
    <div>
      <button onClick={() => { setOpen(!open) }} className ={ 'border justify-center '+props.styles}>
        { props.isMobile ?
        <img
          src={"\\assets\\icons\\add_blue.svg"}
          width={25}
          height={25}
          className="mx-auto"
          alt="Add Post Button"
        />
        :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-700 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg> 

        }
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">

        <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        {/* Model */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* Modal Content - Model Panel has 2 child div's inside */}
            <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-4 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">

                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900 flex gap-3 sm:gap-5 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500 ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Add Post
                  </DialogTitle>
                  {/* Model Form  */}
                  <form onSubmit={onSubmit} className="mt-2 flex flex-col">
                    <label htmlFor="input-title">Title</label>
                    <input id="input-title" name="title" type="text"
                      className="text-sm border border-gray-500 rounded-md p-2 mb-3 sm:mb-4"
                      value={title}
                      onChange={handleTitle}
                    />
                    <div className='mb-3 sm:mb-4 flex justify-between sm:justify-start sm:gap-5'>
                      <DropdownMenu_Tailwind
                        title="Category"
                        options={["Academic", "Clubs", "Sports", "Research", "Employment", "Tenders"]}
                        handler={handleType}
                      />
                      <DropdownMenu_Tailwind
                        title="Department"
                        options={["CSE", "ECE", "EEE", "MCE", "CVE"]}
                        handler={handleDept}
                      />
                    </div>
                    <label htmlFor="input-desc"> Description </label>
                    <textarea id='input-desc' name='desc'
                      className="text-sm border border-gray-500 rounded-md h-36 outline-none mb-4"
                      value={desc}
                      onChange={handleDesc}
                    />
                    <label htmlFor="file" className='mb-2'> Pdf </label>
                    <input 
                      name="file"
                      className='border border-gray-500 rounded-md mb-4'
                      type="file"
                      onChange={handleFile}
                    />
                    <label htmlFor="file" className='mb-2'> Image </label>
                    <input 
                      name="img"
                      className='border border-gray-500 mb-4'
                      type="file"
                      accept = "image/*"
                      onChange={handleImg}
                      />
  

                    {/* Submit and Cancel */}
                    <div className="bg-gray-50 sm:flex sm:gap-5">
                      <button
                        type="submit"
                        onClick={() => setOpen(false)}
                        className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-sky-500  sm:w-[40%]"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => setOpen(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-[40%]"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

              </div>

            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>

  )
}
