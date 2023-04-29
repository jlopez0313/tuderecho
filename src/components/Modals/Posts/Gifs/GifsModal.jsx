import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { getGifs } from '@/services/getGifs';
import Spinner from 'react-bootstrap/Spinner';

export const GifsModal = ( {onSetGif, ...props} ) => {
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [gifs, setGifs] = useState([]);
    const limit = 12;

    const onSetCategory = ( evt ) => {
        setCategory( evt.target.value )
    }

    const onDoSetGif = (gif) => {
        onSetGif( gif )
        setCategory('')
        setGifs([]);
    }

    const handleScroll = async (e) => {
        const bottom = e.target.scrollWidth - e.target.scrollLeft <= e.target.clientWidth + 1;
        if (bottom) {
            console.log('bottom')
            const lista = await getGifs( category, limit, (gifs.length / limit).toFixed() )
            setGifs(list => [...list, ...lista]);
        }
    }

    const onDoSearch = async ( evt ) => {
        evt.preventDefault()
        setIsLoading(true)
        const gifs = await getGifs( category, limit )
        setGifs(gifs);
        setIsLoading(false)
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className='text-center'>
                <Modal.Title className='m-auto' id="contained-modal-title-vcenter">
                    Gifs
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='pb-2 pt-0'>
                <form onSubmit={ onDoSearch }>
                    <input placeholder='Buscar...' className='form-control' value={ category } onChange={onSetCategory}/>
                </form>
                { 
                    isLoading
                    ?
                        <div className="text-center my-3">
                            <Spinner animation="border" role="status" className='m-auto'>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    : null
                }
                <div className="gifs my-2" onScroll={handleScroll}>
                    {
                        gifs.map( (gif, key) => {
                            return <div className='grid-item' key={key}>
                                <img className='media cursor-pointer' src={gif.url} onClick={() => onDoSetGif( gif.url ) } />
                            </div>
                        })
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}
