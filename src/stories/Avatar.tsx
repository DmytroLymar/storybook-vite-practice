import './avatar.css';

export interface AvatarProps {
    /** Image source */
    src?: string;
    /** User name (used for alt + fallback) */
    name?: string;
    /** Avatar size in px */
    size?: number;
    /** Show loading state */
    loading?: boolean;
}

/** User avatar component */
export const Avatar = ({ src, name, size = 40, loading = false }: AvatarProps) => {
    const initials = name
        ? name
              .split(' ')
              .map((word) => word[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()
        : '?';

    return (
        <div
            className={`storybook-avatar ${loading ? 'storybook-avatar--loading' : ''}`}
            style={{ width: size, height: size }}
            aria-busy={loading}
        >
            {loading ? (
                <span className='storybook-avatar__loader' />
            ) : src ? (
                <img src={src} alt={name || 'Avatar'} className='storybook-avatar__image' />
            ) : (
                <span className='storybook-avatar__fallback'>{initials}</span>
            )}
        </div>
    );
};
