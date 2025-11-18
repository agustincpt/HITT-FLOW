import SegmentedGroup from '../components/SegmentedGroup.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { premiumDurations } from '../data/routines.js';

export default function Config({ prefs, onChangePrefs, onStart, streak, onQuickStart }) {
  const durationOptions = [7, 10, 15, 20].map((value) => ({
    label: `${value} min`,
    value,
    sub: premiumDurations.includes(value) && value !== 10 ? 'Premium – Coming soon' : ' ',
    disabled: premiumDurations.includes(value) && value !== 10,
  }));

  const musicOptions = [
    { label: 'Relax', value: 'relax' },
    { label: 'Energetic', value: 'energetic' },
    { label: 'Off', value: 'off' },
  ];

  const voiceOptions = [
    { label: 'Female (en-GB)', value: 'female' },
    { label: 'Male (en-GB)', value: 'male' },
    { label: 'Voice Off', value: 'off' },
  ];

  return (
    <div className="container">
      <div className="card stack-lg" aria-label="Config">
        <div className="stack-md">
          <div className="label-row">
            <h2>Choose routine</h2>
            <span className="text-muted">Streak: {streak}🔥</span>
          </div>
          <SegmentedGroup
            options={durationOptions}
            value={prefs.duration}
            onChange={(val) => onChangePrefs({ ...prefs, duration: val })}
          />
        </div>
        <div className="stack-md">
          <h3>Music</h3>
          <SegmentedGroup
            options={musicOptions}
            value={prefs.music}
            onChange={(val) => onChangePrefs({ ...prefs, music: val })}
          />
        </div>
        <div className="stack-md">
          <h3>Voice</h3>
          <SegmentedGroup
            options={voiceOptions}
            value={prefs.voice}
            onChange={(val) => onChangePrefs({ ...prefs, voice: val })}
          />
        </div>
        <PrimaryButton label="Start" onClick={() => onStart(prefs)} />
        <PrimaryButton label="Quick Start" onClick={onQuickStart} />
      </div>
    </div>
  );
}
