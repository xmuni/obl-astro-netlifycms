import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox";


export default function ImageGallery({ imagesByCategory }) {

    const options = {
        buttons: {
          showDownloadButton: false,
          // showFullscreenButton: false,
          showAutoplayButton: false,
          showThumbnailsButton: false,
        },
        settings: {
          slideAnimationType: 'slide',
          slideTransitionTimingFunction: 'easeInOut',
        }
      }

    return (
    <div className='photo-viewer' id='photo-viewer'>

        <div className='categories'>
        {
            Object.keys(imagesByCategory).map(categoryName => {

                const images = imagesByCategory[categoryName]
                return (

                    <div className='category' key={ categoryName }>

                        
                        <ul>
                        <SimpleReactLightbox className='image-list'>
                        <h2 id={ categoryName }>{ categoryName.replaceAll('_',' ') }</h2>
                            <SRLWrapper options={ options }>
                            {
                            images.map((image,index) => {

                                const { filename, url, width, height, format } = image

                                const author = filename.includes('_vm_') ? 'Vittorio Minuzzo' : 'mmoblfoto.it'
        
                                return (
                                    <li className='thumbnail' key={ index }>
                                        <a href={ url } data-fancybox="gallery" data-caption={ '© '+author }>
                                            <Image
                                                src={ url }
                                                // width={ width }
                                                // height={ height }
                                                // objectFit='cover'
                                                layout='fill'
                                                alt={ '© '+author }
                                            />
                                        </a>
                                    </li>
                                )
                            })
                            }
                            </SRLWrapper>
                        </SimpleReactLightbox>
                        </ul>

                    </div>

                )
            })
        }
        </div>

    </div>
    )
}
