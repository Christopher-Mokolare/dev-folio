import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Project {
  title: string;
  category: string;
  description: string;
  stack: string[];
  status: string;
  accent: string;
  github: string;
  live?: string;
  api?: string;
  visual?: string;
  staging?: string;
  featured?: boolean;
}

interface Skill {
  name: string;
  level: string;
  group: 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'Data & Security';
}

interface Service {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private readonly themeStorageKey = 'cm-portal-theme';
  private readonly contactApiUrl = 'https://cm-portal-contact.onrender.com/api/contact';

  menuOpen = false;
  darkMode = false;
  submitted = false;
  submitting = false;
  submitError = false;
  currentYear = new Date().getFullYear();

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  readonly skills: Skill[] = [
    { name: 'Angular', level: 'Advanced', group: 'Frontend' },
    { name: 'TypeScript', level: 'Advanced', group: 'Frontend' },
    { name: 'RxJS', level: 'Working', group: 'Frontend' },
    { name: 'HTML / SCSS', level: 'Advanced', group: 'Frontend' },
    { name: 'C# / .NET', level: 'Advanced', group: 'Backend' },
    { name: 'ASP.NET Core', level: 'Advanced', group: 'Backend' },
    { name: 'REST APIs', level: 'Advanced', group: 'Backend' },
    { name: 'Entity Framework Core', level: 'Advanced', group: 'Backend' },
    { name: 'PostgreSQL / SQL', level: 'Advanced', group: 'Data & Security' },
    { name: 'JWT / RBAC', level: 'Advanced', group: 'Data & Security' },
    { name: 'AWS', level: 'Working', group: 'Cloud & DevOps' },
    { name: 'Docker', level: 'Working', group: 'Cloud & DevOps' },
    { name: 'GitHub Actions', level: 'Working', group: 'Cloud & DevOps' },
    { name: 'CI/CD', level: 'Working', group: 'Cloud & DevOps' }
  ];

  readonly services: Service[] = [
    {
      icon: '⌘',
      title: 'Full-Stack Web Applications',
      description: 'End-to-end applications with a maintainable Angular frontend and production-oriented .NET backend.',
      bullets: ['Angular + TypeScript', 'ASP.NET Core APIs', 'Authentication & authorization']
    },
    {
      icon: '◈',
      title: 'Product & UI Engineering',
      description: 'Responsive interfaces that turn complex workflows into clear, practical user experiences.',
      bullets: ['Responsive layouts', 'Reusable components', 'Accessible interaction patterns']
    },
    {
      icon: '↗',
      title: 'Cloud & Production Delivery',
      description: 'Deployment-aware engineering across containers, databases, AWS infrastructure and CI/CD.',
      bullets: ['Docker & AWS', 'PostgreSQL architecture', 'Observability & reliability']
    }
  ];

  readonly projects: Project[] = [
    {
      title: 'SecureX',
      category: 'Fintech / Marketplace',
      description: 'A secure peer-to-peer transaction platform built around escrow workflows, KYC, auditability and controlled fund release.',
      stack: ['Angular', 'ASP.NET Core', 'PostgreSQL', 'AWS', 'Ozow'],
      status: 'Production platform',
      accent: 'SX',
      github: 'https://github.com/Christopher-Mokolare',
      live: 'https://www.secureexchange.co.za/',
      visual: 'assets/projects/securex.webp',
      featured: true
    },
    {
      title: 'DoForYou',
      category: 'Task Marketplace',
      description: 'A two-sided task marketplace connecting creators and runners with role-based access, task workflows, payouts and notifications.',
      stack: ['React', '.NET', 'PostgreSQL', 'Render', 'Payments'],
      status: 'Production platform',
      accent: 'DFY',
      github: 'https://github.com/Christopher-Mokolare/DFY-FE',
      live: 'https://doforyou.co.za/',
      staging: 'https://dfy-fe-staging.onrender.com/',
      visual: 'assets/projects/doforyou.webp',
      featured: true
    },
    {
      title: 'TaxiConnect',
      category: 'Transport / Dispatch',
      description: 'A lightweight dispatch platform for coordinating passengers, conductors and drivers across taxi routes and capacity constraints.',
      stack: ['TypeScript', 'Cloudflare Workers', 'D1', 'WebSockets'],
      status: 'Active build',
      accent: 'TC',
      github: 'https://github.com/Christopher-Mokolare/taxiconnect',
      live: 'https://taxiconnect-api.2co-mokolare.workers.dev/',
      api: 'https://taxiconnect-api.2co-mokolare.workers.dev/',
      visual: 'assets/projects/taxiconnect.webp',
      featured: true
    },
    {
      title: 'IndaoHub',
      category: 'Web Platform',
      description: 'A web platform project focused on practical workflows, responsive frontend engineering and maintainable application structure.',
      stack: ['Angular', 'TypeScript', '.NET', 'SQL'],
      status: 'Production platform',
      accent: 'IH',
      github: 'https://github.com/Christopher-Mokolare',
      live: 'https://www.indaohub.co.za/',
      visual: 'assets/projects/indaohub.webp'
    },
    {
      title: 'HAZIE',
      category: 'Application',
      description: 'An application project demonstrating full-stack development, API integration and production-minded engineering practices.',
      stack: ['C#', 'ASP.NET Core', 'Angular', 'PostgreSQL'],
      status: 'Portfolio project',
      accent: 'HZ',
      github: 'https://github.com/Christopher-Mokolare',
      live: 'https://hazie-v2.web.app/',
      visual: 'assets/projects/hazie.webp'
    },
    {
      title: 'TseboKgolo',
      category: 'Web Application',
      description: 'A software project built to explore structured application workflows and polished frontend experiences.',
      stack: ['TypeScript', 'Angular', 'REST', 'SQL'],
      status: 'Production platform',
      accent: 'TK',
      github: 'https://github.com/Christopher-Mokolare',
      live: 'https://tsebokgolo.co.za/',
      visual: 'assets/projects/tsebokgolo.webp'
    }
  ];

  readonly navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' }
  ];

  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem(this.themeStorageKey);
    this.darkMode = savedTheme === 'dark';
  }

  scrollTo(id: string): void {
    this.menuOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem(this.themeStorageKey, this.darkMode ? 'dark' : 'light');
  }

  @HostListener('window:keydown.escape')
  closeMenu(): void {
    this.menuOpen = false;
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const value = this.contactForm.getRawValue();
    this.submitting = true;
    this.submitted = false;
    this.submitError = false;

    try {
      const response = await fetch(this.contactApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });

      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      this.submitted = true;
      this.contactForm.reset();
    } catch {
      this.submitError = true;
    } finally {
      this.submitting = false;
    }
  }

  trackByName(_: number, item: Skill): string {
    return item.name;
  }

  trackByProject(_: number, item: Project): string {
    return item.title;
  }
}