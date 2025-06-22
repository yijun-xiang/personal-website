import Image from 'next/image';

const BerkeleyLogo = () => (
    <Image 
        src="/berkeley-logo.svg"
        alt="UC Berkeley Logo"
        width={40}
        height={40}
        className="mr-3 flex-shrink-0"
        style={{
            width: '40px',
            height: '40px',
            objectFit: 'contain'
        }}
    />
);

export default BerkeleyLogo;