import './PageContainer.css'

export default function PageContainer({children})
{
    return(
        <div className="PageContainer">
            {children}
        </div>
    )
}