import React from 'react'

const ButtonModal = () => {

  const button = document.getElementById('buttonmodal')
  const closebutton = document.getElementById('closebutton')
  const modal = document.getElementById('modal')

  button.addEventListener('click', () => modal.classList.add('scale-100'))
  closebutton.addEventListener('click', () => modal.classList.remove('scale-100'))



  return (
    <>
      <div>
        <button id="buttonmodal" className="focus:outline-none p-2 bg-blue-600 text-white bg-opacity-75 rounded-lg ring-4 ring-indigo-300" type="button">Create Item</button>
      </div>
      <div
        id="modal"
        className="flex top-0 left-0 flex items-center justify-center bg-blue-500 bg-opacity-50 transform scale-0 transition-transform duration-300">

        <div className="bg-gray-900 text-white p-12">
          <button id="closebutton" type="button" class="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default ButtonModal
