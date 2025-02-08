import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

function ContentWrite() {

  const [isOpen , setIsOpen] = useState(false);

  return (
    <>

      <Modal 
        isOpen={isOpen} closeModal={() => setIsOpen(false)} message="Modal message" statusCode={"success"}
      />


      <div className="text-gray-900 dark:text-white w-max p-4">
        <h1 className="text-2xl">Hello New Tailwind CSS.</h1>

        <div onClick={() => {setIsOpen(true)}} className="bg-blue-500">Open Modal</div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel,
          consequuntur error amet blanditiis cum enim odio nihil et molestias
          recusandae dolorem rem sint asperiores neque corrupti! Reprehenderit
          accusamus voluptates fugit!
        </p>
      </div>
    </>
  );
}

export default ContentWrite;
