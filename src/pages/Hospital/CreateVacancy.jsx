import './CreateVacancy.css'
import { useState } from 'react'
import api from '../../api'
import { useNavigate } from 'react-router-dom'

export default function CreateVacancy() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        type: 'jovem',
        points: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('/vacancies', form)
            navigate('/hospital/vacancies')
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao criar vaga')
        }
    }

    return (
        <div className="create-vacancy-container">
            <h1 className="create-vacancy-title">Criar Nova Vaga</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="create-vacancy-form">
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1">Descrição</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1">Tipo</label>
                    <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                    >
                        <option value="jovem">Jovem</option>
                        <option value="idoso">Idoso</option>
                        <option value="familia">Família</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="block mb-1">Pontos</label>
                    <input
                        type="number"
                        value={form.points}
                        onChange={(e) => setForm({ ...form, points: e.target.value })}
                        min="1"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">
                    Criar Vaga
                </button>
            </form>
        </div>
    )
}
