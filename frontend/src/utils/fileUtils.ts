interface LanguageInfo {
  language: string;
  icon: string;
  color: string;
}

export const getLanguageInfo = (filename: string): LanguageInfo => {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  
  const languageMap: Record<string, LanguageInfo> = {
    'js': { 
      language: 'javascript',
      icon: '/icons/javascript.svg',
      color: '#F7DF1E'
    },
    'jsx': { 
      language: 'javascript',
      icon: '/icons/react.svg',
      color: '#61DAFB'
    },
    'ts': { 
      language: 'typescript',
      icon: '/icons/typescript.svg',
      color: '#3178C6'
    },
    'tsx': { 
      language: 'typescript',
      icon: '/icons/react.svg',
      color: '#61DAFB'
    },
    'py': { 
      language: 'python',
      icon: '/icons/python.svg',
      color: '#3776AB'
    },
    'html': { 
      language: 'html',
      icon: '/icons/html.svg',
      color: '#E34F26'
    },
    'css': { 
      language: 'css',
      icon: '/icons/css.svg',
      color: '#1572B6'
    },
    'json': { 
      language: 'json',
      icon: '/icons/json.svg',
      color: '#000000'
    },
    'md': { 
      language: 'markdown',
      icon: '/icons/markdown.svg',
      color: '#000000'
    }
  };

  return languageMap[extension] || {
    language: 'plaintext',
    icon: '/icons/file.svg',
    color: '#808080'
  };
}; 