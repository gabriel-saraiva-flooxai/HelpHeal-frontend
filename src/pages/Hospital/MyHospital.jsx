// src/pages/Hospital/MyHospital.jsx
import { useEffect, useState } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'

export default function MyHospital() {
    const [vacancies, setVacancies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await api.get('/hospital/vacancies')
                setVacancies(response.data)
            } catch (err) {
                setError(err.response?.data?.error || 'Erro ao carregar vagas')
            } finally {
                setLoading(false)
            }
        }

        fetchVacancies()
    }, [])

    if (loading) return <div>Carregando...</div>
    if (error) return <div className="text-red-500">{error}</div>

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Minhas Vagas</h1>
                <Link
                    to="/hospital/vacancies/new"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Criar Nova Vaga
                </Link>
            </div>

            {vacancies.length === 0 ? (
                <p>Nenhuma vaga criada ainda.</p>
            ) : (
                <div className="space-y-4">
                    {vacancies.map((vacancy) => (
                        <div key={vacancy._id} className="border p-4 rounded-lg shadow-sm">
                            <h2 className="font-semibold text-lg">{vacancy.title}</h2>
                            <p className="text-gray-600 mt-1">{vacancy.description}</p>
                            <div className="flex justify-between items-center mt-3">
                                <span className="text-sm text-gray-500">
                                    Tipo: {vacancy.type} | Pontos: {vacancy.points}
                                </span>
                                <Link
                                    to={`/vacancies/${vacancy._id}/applications`}
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    Ver candidaturas
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}