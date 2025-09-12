import { projectStatus } from '$interfaces/project.interface';

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatBudget(budget: string) {
  return budget ? `${budget}€` : 'Nicht angegeben';
}

export function getStatusBadgeClass(status: string) {
  switch (status) {
    case projectStatus.created:
      return 'badge-neutral';
    case projectStatus.introduced:
      return 'badge-info';
    case projectStatus.prototype:
      return 'badge-warning';
    case projectStatus.refinement:
      return 'badge-secondary';
    case projectStatus.ready:
      return 'badge-accent';
    case projectStatus.published:
      return 'badge-success';
    case projectStatus.paid:
      return 'badge-primary';
    default:
      return 'badge-ghost';
  }
}

export function getStatusLabel(status: string) {
  switch (status) {
    case projectStatus.created:
      return 'Erstellt';
    case projectStatus.introduced:
      return 'Vorgestellt';
    case projectStatus.prototype:
      return 'Prototyp';
    case projectStatus.refinement:
      return 'Verfeinerung';
    case projectStatus.ready:
      return 'Bereit';
    case projectStatus.published:
      return 'Veröffentlicht';
    case projectStatus.paid:
      return 'Bezahlt';
    default:
      return 'Unbekannt';
  }
}
