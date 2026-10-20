import { useEffect } from 'react'
import posthog from 'posthog-js'
import { RISET } from '../data/risetData'
import './RisetPage.css'

const WA = '6283171125657'
const WA_DEMO = `https://wa.me/${WA}?text=${encodeURIComponent('Halo RR Devs, saya toko peserta riset minggu ini. Saya ingin menjadwalkan demo 10 menit.')}`

export default function RisetHasilPage() {
  const pilih = (p) => { try { posthog.capture('riset_optin', { pilihan: p }) } catch (e) {} }
  useEffect(() => { const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex'; document.head.appendChild(m); return () => m.remove() }, [])
  const rows = RISET.toko
  const avg = (i) => (rows.length ? Math.round(rows.reduce((a, r) => a + r[i], 0) / rows.length) : 0)
  const sorted = [...rows].sort((a, b) => b[1] - a[1])
  const max = sorted.length ? sorted[0][1] : 1
  return (
    <main className="rk-wrap">
      <div className="rk-kicker">RR Devs · Barbershop Optimization Research</div>
      <h1>Hasil riset Jabodetabek.</h1>
      <p className="rk-lede">Hasil riset toko Anda akan segera terbit dalam waktu 1x24 jam setelah kunjungan riset selesai. Jika data toko Anda belum muncul, mohon tunggu beberapa saat karena tim kami sedang melakukan verifikasi data.</p>
      {rows.length === 0 ? (
        <div className="rk-note">Data hasil riset barbershop Anda sedang diverifikasi dan akan
          ditayangkan di tabel ini selambatnya 24 jam setelah kunjungan riset selesai.</div>
      ) : (
        <>
          <table className="rk-table">
            <thead><tr><th>Nama toko</th><th>Pelanggan per hari</th><th>Akhir pekan</th><th>Jam puncak</th><th>Jalur booking</th><th>Alat berbayar</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r[0]}><td>{r[0]}</td><td className="num">{r[1]}</td><td className="num">{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td></tr>
              ))}
              <tr className="rk-avg"><td>Rata-rata Jabodetabek</td><td className="num">{avg(1)}</td><td className="num">{avg(2)}</td><td colSpan="3">himpunan seluruh peserta riset</td></tr>
            </tbody>
          </table>
          <p className="rk-upd">Tabel terakhir diperbarui: {RISET.diperbarui}</p>
          <p className="rk-sub2">Papan urutan: pelanggan hari biasa per toko</p>
          <div className="rk-bars">
            {sorted.map(r => (
              <div className="rk-bar" key={r[0]}>
                <div className="lblrow"><span>{r[0]}</span><span>{r[1]} / hari</span></div>
                <div className="track"><div className="fill" style={{ width: Math.round((r[1] / max) * 100) + '%' }} /></div>
              </div>
            ))}
          </div>
          {RISET.verbatim && <blockquote className="rk-quote">{RISET.verbatim}<br /><span>- pemilik toko peserta (verbatim, tanpa nama)</span></blockquote>}
          <p className="rk-bridge">Apakah performa manajemen antrean toko Anda berada di bawah rata-rata Jabodetabek? Pelajari bagaimana sistem manajemen antrean kami membantu menjaga pelanggan Anda agar tidak pindah ke tempat lain. Segera jadwalkan demo 10 menit Anda sekarang.</p>
        </>
      )}
      <a className="rk-btn" href={WA_DEMO} target="_blank" rel="noreferrer" onClick={() => pilih('demo-dari-hasil')}>
        Lihat Demo Sistem (10 Menit)
         {rows.length === 0 && (
             <span>Pelajari bagaimana sistem manajemen antrean kami membantu menjaga pelanggan Anda agar tidak pindah ke tempat lain.</span>
         )}
      </a>
      <footer className="rk-foot">Nama toko disamarkan; hanya pemilik toko peserta yang dapat mengenali baris datanya sendiri. Anda dapat meminta data toko Anda dihapus kapan saja melalui konfirmasi WhatsApp pribadi kami.</footer>
    </main>
  )
}