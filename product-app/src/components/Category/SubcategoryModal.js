function SubcategoryModal({ isOpen, onClose, subcategories }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                width: '80%',
                maxWidth: '600px'
            }}>
                <h2>Subcategories</h2>
                {subcategories.length > 0 ? (
                    <ul>
                        {subcategories.map(sub => (
                            <li key={sub.id}>{sub.name}</li>
                        ))}
                    </ul>
                ) : <p>No subcategories available.</p>}
                <button onClick={onClose} style={{ padding: '10px 20px', cursor: 'pointer' }}>Close</button>
            </div>
        </div>
    );
}


export default SubcategoryModal;