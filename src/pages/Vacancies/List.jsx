import './List.css'
import { useEffect, useState } from 'react'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import { getUserRole } from '../../auth'

export default function VacancyList() {
  const [vacancies, setVacancies] = useState([])
  const role = getUserRole()
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/vacancies')
      .then(res => setVacancies(res.data))
      .catch(console.error)
  }, [])

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '1rem 0' }}>Vagas Disponíveis</h1>
      
      {['admin', 'internal_user'].includes(role) && (
        <div style={{ textAlign: 'center' }}>
          <button 
            className="new-vacancy-btn" 
            onClick={() => navigate('/vacancies/new')}>
            + Nova Vaga
          </button>
        </div>
      )}

      <div className="vacancy-list">
        {vacancies.map(v => (
          <div key={v._id} className="vacancy-card">
            <h2>{v.title}</h2>
            <p>{v.description}</p>
            <div className="vacancy-footer">
              <span>Tipo: {v.type}</span>
              <span>Pontos: {v.points}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
