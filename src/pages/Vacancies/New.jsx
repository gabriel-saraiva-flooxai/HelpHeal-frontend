import './New.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { getUserRole } from '../../auth'

export default function VacancyCreate() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('jovem')
    const [points, setPoints] = useState(0)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // controle de acesso
    useEffect(() => {
        const role = getUserRole()
        if (!['admin', 'internal_user'].includes(role)) {
            navigate('/vacancies')
        }
    }, [navigate])

    const handleSubmit = async e => {
        e.preventDefault()
        setError(null)

        try {
            await api.post('/vacancies', { title, description, type, points })
            navigate('/vacancies')
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao criar vaga')
        }
    }

    return (
        <div className="create-vacancy-container">
            <h2 className="create-vacancy-title">Criar Nova Vaga</h2>
            <form onSubmit={handleSubmit} className="create-vacancy-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label>Título</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Tipo</label>
                    <select value={type} onChange={e => setType(e.target.value)}>
                        <option value="jovem">Jovem</option>
                        <option value="idoso">Idoso</option>
                        <option value="familia">Família</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Pontos</label>
                    <input
                        type="number"
                        value={points}
                        onChange={e => setPoints(Number(e.target.value))}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">
                    Salvar
                </button>
            </form>
        </div>
    )
}
