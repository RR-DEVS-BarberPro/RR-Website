import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import posthog from 'posthog-js'
import './RisetPage.css'

const WA = '6283171125657'
const wa = (t) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`
const WA_DEMO = wa('Halo RR Devs, saya toko peserta riset minggu ini. Saya ingin menjadwalkan demo 10 menit.')
const WA_TRIAL = wa('Halo RR Devs, saya toko peserta riset minggu ini. Saya ingin uji coba sistem 1 bulan tanpa biaya.')

export default function RisetPage() {
  const pilih = (p) => { try { posthog.capture('riset_optin', { pilihan: p }) } catch (e) {} }
  useEffect(() => { const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex'; document.head.appendChild(m); return () => m.remove() }, [])
  return (
    <main className="rk-wrap">
      <div className="rk-kicker">RR Devs · Barbershop Optimization Research</div>
      <h1>Terima kasih sudah mengikuti riset minggu ini.</h1>
      <p className="rk-lede">Hasil riset toko Anda akan segera terbit dalam waktu 1x24 jam setelah kunjungan riset selesai.
         Pilih satu langkah lanjutan di bawah untuk mengoptimalkan antrean barbershop Anda:</p>
      <a className="rk-btn" href={WA_DEMO} target="_blank" rel="noreferrer" onClick={() => pilih('demo')}>
        Lihat Demo Sistem (10 Menit)
        <span>Pelajari bagaimana sistem manajemen antrean kami membantu menjaga pelanggan Anda agar tidak pindah ke tempat lain.</span>
      </a>
      <a className="rk-btn rk-outline" href={WA_TRIAL} target="_blank" rel="noreferrer" onClick={() => pilih('trial')}>
        Coba Gratis 1 Bulan
        <span>Akses sistem booking penuh menggunakan data riil toko Anda. Tanpa kontrak, berhenti kapan saja.</span>
      </a>
      <p className="rk-fine">Tanpa biaya. Tanpa komitmen terikat.</p>
      <Link className="rk-link" to="/riset/hasil">Lihat hasil riset Jabodetabek →</Link>
    </main>
  )
}