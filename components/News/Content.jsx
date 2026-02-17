import React from 'react';
import styles from "./blogstyles.module.css"

const Content = ({ content }) => {

    return (
        <>
            <section className='h-full w-full pb-[5vw]' id='blog-detail'>
                <div className=' w-full h-full flex items-start justify-between'>
                    <div className='w-full h-full space-y-[1.5vw] '>
                        <div
                            className={`${styles.blogContent}`}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Content;