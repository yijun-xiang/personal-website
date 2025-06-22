'use client';
import React, { useState, useEffect } from 'react';

type Phrase = {
    lang: string;
    hello: string;
};

type QueueItem = {
    from: string;
    to: string;
    start: number;
    end: number;
    char?: string;
}

const ScrambleText = ({ phrases }: { phrases: Phrase[] }) => {
    const [text, setText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    useEffect(() => {
        let frameRequest: number;
        let frame = 0;
        let queue: QueueItem[] = [];
        
        const update = () => {
            let output = '';
            let complete = 0;
            for (let i = 0, n = queue.length; i < n; i++) {
                const { from, to, start, end } = queue[i];
                let { char } = queue[i];

                if (frame >= start) {
                    const progress = (frame - start) / (end - start);
                    if (progress >= 1) {
                        complete++;
                        output += to;
                    } else {
                        if (!char || Math.random() < 0.28) {
                            char = chars[Math.floor(Math.random() * chars.length)];
                            queue[i].char = char;
                        }
                        output += `<span class="scrambling">${char}</span>`;
                    }
                } else {
                    output += from;
                }
            }
            setText(output);
            if (complete === queue.length) {
                 setTimeout(() => {
                    setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                }, 1500); 
            } else {
                frameRequest = requestAnimationFrame(update);
                frame++;
            }
        };

        const resolver = () => {
             if (!phrases || phrases.length === 0) return;
             const nextPhrase = phrases[phraseIndex].hello;
             const oldText = text; 
             frame = 0;
             queue = nextPhrase.split('').map((char, i) => {
                 const from = oldText.split('')[i] || '';
                 const start = Math.floor(Math.random() * 30); 
                 const end = start + Math.floor(Math.random() * 30); 
                 return { from, to: char, start, end };
             });
        }
        
        resolver();
        update();

        return () => cancelAnimationFrame(frameRequest);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phraseIndex, phrases]);

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
};
export default ScrambleText;